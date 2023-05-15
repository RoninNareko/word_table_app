import {gapi} from "gapi-script";

gapi.client
    .init({
        apiKey: "AIzaSyDKmvDOyhhRZS1kpKsOxyZA2UutV0bpWlw",
        // Your API key will be automatically added to the Discovery Document URLs.
        // clientId and scope are optional if auth is not required.
        clientId:
            "688393895998-6bu5vfnhiks15bepesdjf8kr2bndt0ar.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/drive",
        plugin_name: "My Project 84122",
    })
    .then(function (response: any) {
        // 3. Initialize and make the API request.
        const fileId = "1TKZFwNdDg-X-DPJiYXjtLC46JkgRjdAI";
        const url = `https://www.googleapis.com/drive/v3/files/${fileId}?supportsAllDrives=true&alt=media`;
        console.log(window.gapi.client);
        var request1 = gapi.client.request({
            path: "/drive/v3/files/" + fileId,
            method: "GET",
        });
        request1.execute(function (resp) {
            console.log(resp);
        });
        console.log("success initial", request1);
    })
    .catch(function (err: any) {
        console.log(err, "errr");
    });
}