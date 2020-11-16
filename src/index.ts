import { tk as tasker } from "tasker-types";
import { pageInfo } from "./OpenGraph";
import { MessageInterface } from "./MessageInterface";

const PROJECT_NAME = "tasker_sms_link";
const OPENGRAPH_API_KEY = tasker.global("OPENGRAPHAPI");

async function main(): Promise<void> {
    // variable name to store return value in
    let varName: string = (PROJECT_NAME + "_msg").toUpperCase();
    let msg: MessageInterface = { createNotification: false };

    // get most recent sms
    let body: string = tasker.global("SMSRB");

    // get url from sms body using regex
    let urlFromSMS: string = (body.match(/(?<=^|\s)https?:\/\/.+?(?=\s|$)/) || [])[0]
    // if no url found
    if (typeof urlFromSMS === "undefined") {
        // return with create notification set to false
        tasker.setGlobal(varName, JSON.stringify(msg));
        tasker.exit();
    }

    // get opengraph info for url
    let info = await pageInfo(OPENGRAPH_API_KEY, urlFromSMS);

    // place notification info in return object, set create notification to true
    msg.createNotification = true;
    msg.title = info.hybridGraph.title ?? "";
    msg.description = info.hybridGraph.description ?? "";
    msg.favicon = info.hybridGraph.favicon ?? "";
    msg.url = info.hybridGraph.url ?? "";
    tasker.setGlobal(varName, JSON.stringify(msg));
    tasker.exit();
}

main();
