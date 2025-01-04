import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import app from '../shared/express-app';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    
    const expressReq: any = Object.assign(req, {
        pipe: () => {},
        header: (name: string) => req.headers?.[name.toLowerCase()],
    });
    
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

        app(expressReq, mockRes);
    });
};

export default httpTrigger; 