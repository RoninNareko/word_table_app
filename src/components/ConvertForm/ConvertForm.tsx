import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

type Inputs = {
  docxLink: string;
  SheetLink: string;
};
// init({
//   apiKey: "AIzaSyDKmvDOyhhRZS1kpKsOxyZA2UutV0bpWlw",
//   // Your API key will be automatically added to the Discovery Document URLs.
//   // clientId and scope are optional if auth is not required.
//   clientId:
//       "688393895998-6bu5vfnhiks15bepesdjf8kr2bndt0ar.apps.googleusercontent.com",
//   scope: "https://www.googleapis.com/auth/drive",
//   plugin_name: "My Project 84122",
// })
export default function ConvertForm() {
  const gapi = window.gapi;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";

  const initer = () => {
    gapi.client
      .init({
        apiKey: "AIzaSyDKmvDOyhhRZS1kpKsOxyZA2UutV0bpWlw",
        discoveryDocs: [DISCOVERY_DOC],
        plugin_name: "My Project 84122",
      })
      .then(() => {
        gapi.client.drive.files
          .get({
            fileId: "1TKZFwNdDg-X-DPJiYXjtLC46JkgRjdAI",
            alt: "media",
          })
          .then((docx) => {
            console.log(docx.body, "docx");

            // console.log(zip, "zip");
          });
      });
  };
  useEffect(() => {
    if (gapi) {
      console.log(gapi, "ololo");
      gapi.load("client", initer);
    }
  }, [gapi, initer]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("docxLink", { required: true })} />

      <input {...register("SheetLink", { required: true })} />

      {errors.docxLink && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
