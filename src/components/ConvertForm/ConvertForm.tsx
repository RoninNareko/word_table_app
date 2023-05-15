import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { gapi } from "gapi-script";

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

  useEffect(() => {
    function start() {
      // 2. Initialize the JavaScript client library.
      gapi.client
        .init({
          apiKey: "AIzaSyDKmvDOyhhRZS1kpKsOxyZA2UutV0bpWlw",
          // Your API key will be automatically added to the Discovery Document URLs.
          // clientId and scope are optional if auth is not required.
          clientId:
            "688393895998-6bu5vfnhiks15bepesdjf8kr2bndt0ar.apps.googleusercontent.com",
          scope: "email",
          plugin_name: "My Project 84122",
        })
        .then(function (response: any) {
          // 3. Initialize and make the API request.
          console.log("success initial", response);
        })
        .catch(function (err: any) {
          console.log(err, "errr");
        });
    }

    // 1. Load the JavaScript client library.
    gapi.load("client", start);
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("docxLink", { required: true })} />

      <input {...register("SheetLink", { required: true })} />

      {errors.docxLink && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
