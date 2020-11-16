import { tk as tasker } from "tasker-types";
import { pageInfo } from "./OpenGraph";

const PROJECT_NAME = "tasker_sms_link";
const OPENGRAPH_API_KEY = tasker.global("OPENGRAPHAPI");

async function main(): Promise<void> {
    // variable name to store return value in
    let varName = (PROJECT_NAME + "_msg").toUpperCase();

    // get most recent sms
    let body: string = tasker.global("SMSRB");

    // get url from sms body using regex
    let urlFromSMS: string = (body.match(/(?<=^|\s)https?:\/\/.+?(?=\s|$)/) || [])[0]
    // if no url found
    if (typeof urlFromSMS === "undefined") {
        // return with create notification set to false
        tasker.setGlobal(varName, JSON.stringify({
            createNotification: false
        }));
        tasker.exit();
    }

    // get opengraph info for url
    let info = await pageInfo(OPENGRAPH_API_KEY, urlFromSMS);

    // place notification info in return object, set create notification to true
    tasker.setGlobal(varName, JSON.stringify({
        createNotification: true,
        title: info.hybridGraph.title ?? "",
        description: info.hybridGraph.description ?? "",
        favicon: info.hybridGraph.favicon ?? "",
        url: info.hybridGraph.url ?? ""
    }));
    tasker.exit();
}

main();
