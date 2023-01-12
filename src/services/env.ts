import {cleanEnv, num, str} from 'envalid';
import {join} from "path";

export const env = cleanEnv(process.env, {
    APP_PORT: num({default: 3000}),
    FILE_PATH: str({default: join(__dirname, '../../mock_files')}),
})
