import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useNestedFields from '../../../../hooks/useNestedFields';
import { YearbookContractDetail } from '../../../../models/v2';
import Button from '../../../ui/Button';
import Input from '../../../ui/Form/Inputs';

export default function YearbookContractDetailFields() {
  const { append, fields, name, remove } = useNestedFields({ name: 'yearbookContractDetails' });

  const getNestedName = (field: string, index: number) => `${name}.${index}.${field}`;

  return (
    <>
      <div className="col-span-2">
        {fields.map((item, i) => (
          <div
            className="grid grid-cols-3 col-span-2 gap-y-8 gap-x-4 border-b-gray-300 border-b pb-4 mb-4"
            key={item.yearbookContractDetailsId}
          >
            <Input.Select
              label="Binding Type"
              name={getNestedName('bindingType', i)}
              options={[
                { label: 'Soft Cover', value: 'soft_cover' },
                { label: 'Hard Cover', value: 'hard_cover' },
                { label: 'Perfect Bound', value: 'perfect_bound' },
              ]}
            />
            <Input label="Quantity" name={getNestedName('quantity', i)} type="number" />
            <Input.Currency label="School Price" name={getNestedName('schoolPrice', i)} />
            <Input label="Presale Price" name={getNestedName('presalePrice', i)} type="number" />
            <button
              onClick={async () => {
                if (item.isPersisted) {
                  const temp = new YearbookContractDetail(item);
                  temp.isPersisted = true;

                  const res = await temp.destroy();

                  if (res) remove(i);
                }
                else {
                  remove(i);
                }
              }}
              type="button"
            >
              <FontAwesomeIcon icon={faTrashAlt} className="text-red-400" />
            </button>
            <Input
              containerProps={{ className: 'col-start-1' }}
              label="Final Sale Price"
              name={getNestedName('finalSalePrice', i)}
              type="number"
            />
            <Input label="Shipping Cost" name={getNestedName('shipping', i)} type="number" />
          </div>
        ))}
      </div>
      <Button
        className="col-start-2 w-1/2 place-self-end"
        outlined
        onClick={() => append(new YearbookContractDetail())}
        variant="success"
      >
        Add Yearbook Contract
      </Button>
    </>
  );
}