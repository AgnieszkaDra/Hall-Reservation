import Header from './helpers/Header';
import { AccountSection } from '../sections/AccountSection';
import { getCSSVariable } from '../../utils/getCSSVariable';
import '../../styles/header.scss'

export const HeaderMain = async (): Promise<HTMLElement> => {
    const account = await AccountSection("login", "user");

    const header = Header({
        backgroundColor: getCSSVariable("--color-choco"),
        children: [account],
        className: 'header__main'
    });

    return header;
};

export default HeaderMain;





