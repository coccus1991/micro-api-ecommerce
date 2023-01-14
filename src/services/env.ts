import {cleanEnv, num, str} from 'envalid';
import {join} from "path";

export const env = cleanEnv(process.env, {
    MAE_APP_PORT: num({default: 3000}),
    MAE_FILE_PATH: str({default: join(__dirname, '../../mock_files')}),
    NODE_ENV: str({default: 'development'}),
    MAE_LOG_LEVEL: str({default: 'debug'}),
})
