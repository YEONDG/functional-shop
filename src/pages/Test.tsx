import { useForm, useController, UseControllerProps } from 'react-hook-form';

let renderCount = 0;

function Input(props: UseControllerProps) {
  const { field } = useController(props);

  return (
    <div>
      <input {...field} type='number' placeholder={props.name} />
      <p>
        value: {JSON.stringify(field.value)} ({typeof field.value})
      </p>
    </div>
  );
}

export default function Test() {
  const { handleSubmit, control } = useForm({
    defaultValues: {},
    values: {}, // this line triggers the bug
  });
  renderCount++;

  return (
    <div>
      <form onSubmit={handleSubmit(console.log)}>
        <Input control={control} name='views' defaultValue={null} />
        <input type='submit' />
      </form>
    </div>
  );
}
