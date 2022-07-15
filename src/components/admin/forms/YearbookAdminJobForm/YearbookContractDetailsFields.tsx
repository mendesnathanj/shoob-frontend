import useNestedFields from '../../../../hooks/useNestedFields';
import { YearbookContractDetail } from '../../../../models/v2';
import Button from '../../../ui/Button';
import Input from '../../../ui/Form/Inputs';

export default function YearbookContractDetailFields() {
  const { name, append, fields } = useNestedFields({ name: 'yearbookContractDetails' });

  const getNestedName = (field: string, index: number) => `${name}.${index}.${field}`;

  return (
    <div>
      {fields.map((item, i) => (
        <div key={item.yearbookContractDetailsId}>
          <Input.Select
            label="Binding Type"
            name={getNestedName('bindingType', i)}
            options={[
              { label: 'Soft Cover', value: 'soft_cover' },
              { label: 'Hard Cover', value: 'hard_cover' },
              { label: 'Perfect Bound', value: 'perfect_bound' },
            ]}
          />
          <Input label="Presale Price" name={getNestedName('presalePrice', i)} type="number" />
          <Input
            containerProps={{ className: 'col-start-1' }}
            label="Final Sale Price"
            name={getNestedName('finalSalePrice', i)}
            type="number"
          />
          <Input label="Shipping Cost" name={getNestedName('shipping', i)} type="number" />
        </div>
      ))}
      <Button
        outlined
        variant="success"
        onClick={() => append(new YearbookContractDetail())}
      >
        Add Yearbook Contract
      </Button>
    </div>
  );
}
