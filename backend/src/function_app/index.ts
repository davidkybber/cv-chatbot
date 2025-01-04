import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import app from '../shared/express-app';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    
    // Handle the request using Express
    await new Promise((resolve, reject) => {
        const mockRes: any = {
            status: (code: number) => {
                context.res = { status: code };
                return mockRes;
            },
            send: (body: any) => {
                if (context.res) {
                    context.res.body = body;
                }
                resolve(undefined);
                return mockRes;
            },
            json: (body: any) => {
                if (context.res) {
                    context.res.body = body;
                }
                resolve(undefined);
                return mockRes;
            }
        };

        app(req, mockRes);
    });
};

export default httpTrigger; 
