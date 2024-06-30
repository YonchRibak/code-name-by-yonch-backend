import dotenv from "dotenv";

// Load ".env" file into process.env object:
dotenv.config();

class AppConfig {
    public readonly isDevelopment = process.env.NODE_ENV === "development";
    public readonly isProduction = process.env.NODE_ENV === "production";
    public readonly port = process.env.PORT;
    public readonly mysqlHost = process.env.MYSQL_HOST;
    public readonly mysqlUser = process.env.MYSQL_USER;
    public readonly mysqlPassword = process.env.MYSQL_PASSWORD;
    public readonly mysqlDatabase = process.env.MYSQL_DATABASE;
    public readonly herokuUri = process.env.JAWSDB_URL
}

export const appConfig = new AppConfig();
