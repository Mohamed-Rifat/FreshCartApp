import gif404 from '../../assets/Images/Error404.gif';
import { Helmet } from 'react-helmet'
export default function MainContent() {
    return (
        <>
            <Helmet>
                <title>Not Found</title>
            </Helmet>
            <main className=" bg-[#EAE9E8]">
                <img src={gif404} alt="404 Not Found" className="mx-auto" />
            </main>
        </>
    );
}