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
            className="grid grid-cols-12 gap-y-6 gap-x-8 border-b-gray-300 border-b last:border-none pb-4 mb-4"
            key={item.yearbookContractDetailsId}
          >
            <Input.Select
              containerProps={{ className: 'col-span-11' }}
              label="Binding Type"
              name={getNestedName('bindingType', i)}
              options={[
                { label: 'Soft Cover', value: 'soft_cover' },
                { label: 'Hard Cover', value: 'hard_cover' },
                { label: 'Perfect Bound', value: 'perfect_bound' },
              ]}
            />
            <div className="flex justify-center items-end pb-2 col-span-1">
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
            </div>
            <Input.Currency
              containerProps={{ className: 'col-span-4' }}
              label="Price per Book"
              name={getNestedName('pricePerBook', i)}
            />
            <Input.Currency
              containerProps={{ className: 'col-span-4' }}
              label="Pre-Sale Price"
              name={getNestedName('presalePrice', i)}
            />
            <Input.Currency
              containerProps={{ className: 'col-span-4' }}
              label="Final-Sale Price"
              name={getNestedName('finalSalePrice', i)}
            />
            <Input.Select
              containerProps={{ className: 'col-span-4' }}
              label="Hard Copy Proof"
              name={getNestedName('hardCopyProof', i)}
              options={[
                { label: 'Yes', value: true },
                { label: 'No', value: false },
              ]}
            />
            <Input
              containerProps={{ className: 'col-span-4' }}
              label="Number of Extras"
              name={getNestedName('numOfExtras', i)}
              type="number"
            />
            <Input
              containerProps={{ className: 'col-span-4' }}
              label="Quantity"
              name={getNestedName('quantity', i)}
              type="number"
            />
          </div>
        ))}
      </div>
      <Button
        className="col-start-2 place-self-end"
        outlined
        onClick={() => append(new YearbookContractDetail())}
        variant="success"
      >
        Add Yearbook Contract
      </Button>
    </>
  );
}
