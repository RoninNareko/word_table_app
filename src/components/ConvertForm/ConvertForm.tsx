import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  docxLink: string;
  SheetLink: string;
};

export default function ConvertForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("docxLink", { required: true })} />

      <input {...register("SheetLink", { required: true })} />

      {errors.docxLink && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
