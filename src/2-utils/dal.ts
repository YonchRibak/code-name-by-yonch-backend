import mysql2, { PoolOptions, QueryError } from "mysql2";
import { appConfig } from "./app-config";

// DAL = Data Access Layer - The only one accessing the database.
class DAL {

    constructor(){
        console.log("==  init db \n  =="+appConfig.herokuUri +"\n"+ appConfig.isProduction)
    }
  private devConfigs: PoolOptions = {
    host: appConfig.mysqlHost,
    user: appConfig.mysqlUser,
    password: appConfig.mysqlPassword,
    database: appConfig.mysqlDatabase,
  };

  private prodConfigs: PoolOptions = {
    uri: appConfig.herokuUri,
  };

  // Database configuration:
  private options: PoolOptions = appConfig.isProduction
    ? this.prodConfigs
    : this.devConfigs;

  // Creating a connection. If the connection is closed, the pool will create another one:
  private readonly connection = mysql2.createPool(this.options);

  // Execute sql:
  public execute(sql: string, values?: any[]): Promise<any> {
    // To Promisify
    return new Promise<any>((resolve, reject) => {
      this.connection.query(sql, values, (err: QueryError, result: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
}

export const dal = new DAL();
