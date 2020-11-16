import { tk as tasker, tk } from "tasker-types";
import { pageInfo, OpenGraphResponse } from "./OpenGraph";
import { MessageInterface } from "./MessageInterface";

// this variable is predefined from tasker task
// contains api key
declare const opengraphapi: string;

const PROJECT_NAME: string = "tasker_sms_link";

/**
 * Set message to tasker global variable and exit task
 * @param msg Message to return
 */
function taskerReturn(msg: any): void {
    let varName: string = (PROJECT_NAME + "_msg").toUpperCase();
    tasker.setGlobal(varName, JSON.stringify(msg));
    tasker.exit();
}

async function main(): Promise<void> {
    // variable name to store return value in
    let msg: MessageInterface = { createNotification: false };

    // get most recent sms
    let body: string = tasker.global("SMSRB");

    // get url from sms body using regex
    let urlFromSMS: string = (body.match(/(?<=^|\s)https?:\/\/.+?(?=\s|$)/) || [])[0]
    // if no url found
    if (typeof urlFromSMS === "undefined") {
        // return with create notification set to false
        taskerReturn(msg);
    }

    // get opengraph info for url
    let info: OpenGraphResponse = await pageInfo(opengraphapi, urlFromSMS);

    // place notification info in return object, set create notification to true
    msg.createNotification = true;
    msg.title = info.hybridGraph.title ?? "";
    msg.description = info.hybridGraph.description ?? "";
    msg.favicon = info.hybridGraph.favicon ?? "";
    msg.url = info.hybridGraph.url ?? "";
    taskerReturn(msg);
}

main();
