/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  useFloating,
  offset,
  flip,
  shift,
  useListNavigation,
  useHover,
  useTypeahead,
  useInteractions,
  useRole,
  useClick,
  useDismiss,
  autoUpdate,
  safePolygon,
  FloatingPortal,
  useFloatingTree,
  useFloatingNodeId,
  useFloatingParentNodeId,
  FloatingNode,
  FloatingTree,
  FloatingFocusManager
} from '@floating-ui/react-dom-interactions';
import cn from 'classnames';
import mergeRefs from 'react-merge-refs';

type ItemProps = {
  label: string;
  disabled?: boolean;
} & React.HTMLProps<HTMLButtonElement>;

export const MenuItem = forwardRef<HTMLButtonElement, ItemProps>(({ label, disabled, ...props }, ref) => {
  return (
    <button {...props} ref={ref} role="menuitem" disabled={disabled} type="button">
      {label}
    </button>
  );
});

interface Props {
  label?: string;
  nested?: boolean;
  children?: React.ReactNode;
}

export const MenuComponent = forwardRef<
  any,
  Props & React.HTMLProps<HTMLButtonElement>
>(({ children, label, ...props }, ref) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [allowHover, setAllowHover] = useState(false);

  const listItemsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const listContentRef = useRef(
    Children.map(children, (child) => (isValidElement(child) ? child.props.label : null)) as Array<string | null>
  );

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const nested = parentId != null;

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    refs,
    update,
    context
  } = useFloating({
    middleware: [
      offset({ alignmentAxis: nested ? -5 : 0, mainAxis: 4 }),
      flip(),
      shift()
    ],
    nodeId,
    onOpenChange: setOpen,
    open,
    placement: nested ? 'right-start' : 'bottom-start',
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [
      useHover(context, {
        delay: { open: 50 },
        enabled: nested && allowHover,
        handleClose: safePolygon({ restMs: 25 }),
      }),
      useClick(context, {
        ignoreMouse: nested,
        pointerDown: true,
        toggle: !nested,
      }),
      useRole(context, { role: 'menu' }),
      useDismiss(context),
      useListNavigation(context, {
        activeIndex,
        listRef: listItemsRef,
        nested,
        onNavigate: setActiveIndex
      }),
      useTypeahead(context, {
        activeIndex,
        listRef: listContentRef,
        onMatch: open ? setActiveIndex : undefined,
      })
    ]
  );

  useEffect(() => {
    if (open && refs.reference.current && refs.floating.current) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [open, update, refs.reference, refs.floating]);

  // Block pointer events of sibling list items while a nested submenu is open
  useEffect(() => {
    function onTreeOpenChange({
      open,
      reference,
      parentId: dataParentId,
      nodeId: dataNodeId
    }: {
      open: boolean;
      reference: Element;
      parentId: string;
      nodeId: string;
    }) {
      if (dataParentId === nodeId) {
        listItemsRef.current.forEach((item) => {
          if (item && item !== reference) {
            // eslint-disable-next-line no-param-reassign
            item.style.pointerEvents = open ? 'none' : '';
          }
        });
      }

      if (open && dataParentId === parentId && dataNodeId !== nodeId) {
        setOpen(false);
      }
    }

    tree?.events.on('openChange', onTreeOpenChange);
    return () => {
      tree?.events.off('openChange', onTreeOpenChange);
    };
  }, [nodeId, open, parentId, tree]);

  useEffect(() => {
    tree?.events.emit('openChange', {
      nodeId,
      open,
      parentId,
      reference: refs.reference.current
    });
  }, [nodeId, parentId, open, refs.reference, tree]);

  // Determine if "hover" logic can run based on the modality of input. This
  // prevents unwanted focus synchronization as menus open and close with
  // keyboard navigation and the cursor is resting on the menu.
  useEffect(() => {
    function onPointerMove() {
      setAllowHover(true);
    }

    function onKeyDown() {
      setAllowHover(false);
    }

    window.addEventListener('pointermove', onPointerMove, {
      capture: true,
      once: true,
    });
    window.addEventListener('keydown', onKeyDown, true);
    return () => {
      window.removeEventListener('pointermove', onPointerMove, {
        capture: true
      });
      window.removeEventListener('keydown', onKeyDown, true);
    };
  }, [allowHover]);

  const mergedReferenceRef = useMemo(() => mergeRefs([ref, reference]), [
    reference,
    ref
  ]);

  return (
    <FloatingNode id={nodeId}>
      <button
        type="button"
        {...getReferenceProps({
          ...props,
          onClick: ({ currentTarget }) => (currentTarget as HTMLButtonElement).focus(),
          ref: mergedReferenceRef,
          ...(nested ?
            {
              className: cn('MenuItem', { open }),
              onKeyDown(event) {
                // Prevent more than one menu from being open.
                if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                  setOpen(false);
                }
              },
              role: 'menuitem',
            } :
            { className: cn('RootMenu', { open }) })
        })}
      >
        {label} {nested && <span style={{ marginLeft: 10 }}>➔</span>}
      </button>
      <FloatingPortal>
        {open && (
          <FloatingFocusManager
            context={context}
            preventTabbing
            modal={!nested}
          >
            <div
              {...getFloatingProps({
                className: 'Menu',
                ref: floating,
                style: {
                  left: x ?? '',
                  position: strategy,
                  top: y ?? '',
                }
              })}
            >
              {Children.map(
                children,
                (child, index) => isValidElement(child) &&
                  cloneElement(
                    child,
                    getItemProps({
                      className: 'MenuItem',
                      // By default `focusItemOnHover` uses `pointermove` sync,
                      // but when a menu closes we want this to sync it on
                      // `enter` even if the cursor didn't move.
                      onClick: child.props.onClick,
                      onPointerEnter() {
                        if (allowHover) {
                          setActiveIndex(index);
                        }
                      },
                      ref(node: HTMLButtonElement) {
                        listItemsRef.current[index] = node;
                      },
                      role: 'menuitem',
                    })
                  )
              )}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </FloatingNode>
  );
});

export const Menu: React.FC<Props> = forwardRef((props, ref) => {
  const parentId = useFloatingParentNodeId();

  if (parentId == null) {
    return (
      <FloatingTree>
        <MenuComponent {...props} ref={ref} />
      </FloatingTree>
    );
  }

  return <MenuComponent {...props} ref={ref} />;
});
