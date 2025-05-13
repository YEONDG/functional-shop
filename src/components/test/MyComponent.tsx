import { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FormDataSchema, MyFormData } from './FormData';

export type FormProps = {
  model: MyFormData;
  onUpdate: (updated: MyFormData) => void;
};

let cnt = 0;

export default function MyComponent({ model, onUpdate }: FormProps) {
  cnt++;
  console.log(`=== 렌더링 #${cnt} 시작 ===`);

  const memoizedModel = useMemo(() => model, [JSON.stringify(model)]);

  const {
    formState: { isValid },
    control,
    watch,
  } = useForm<MyFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    values: memoizedModel,
    resolver: zodResolver(FormDataSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'myfield',
  });

  const watchedValues = watch();

  useEffect(() => {
    if (isValid) {
      console.log(watchedValues, '실행하라!');
      onUpdate(watchedValues);
    }
  }, [watchedValues, isValid, onUpdate]);

  console.log(isValid, 'isValid');
  console.log(cnt, '렌더링횟수');
  console.log('---------------------리렌더링갑니다--------------------------------------------');

  return (
    <div className='p-5'>
      <div>
        <form className='flex flex-col gap-4'>
          <div className='flex flex-col gap-8 '>
            {fields.map((item, index) => {
              return (
                <div key={item.id} className='flex-col gap-4'>
                  <div className='flex flex-col gap-4'>
                    <button type='button' className='border-2 border-red-500' onClick={() => remove(index)}>
                      Remove
                    </button>
                    <Controller
                      control={control}
                      name={`myfield.${index}.name`}
                      render={({ field: { name, value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
                        <input
                          ref={ref}
                          className='border-2'
                          name={name}
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`myfield.${index}.text`}
                      render={({ field: { name, value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
                        <input
                          ref={ref}
                          className='border-2'
                          name={name}
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className='grid grid-cols-12 flex-col w-full'>
            <button
              type='button'
              className='bg-red-200 col-span-5 sm:col-span-3'
              onClick={() => append({ name: '', text: '' })}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
