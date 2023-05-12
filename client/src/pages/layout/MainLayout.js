import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export default function MainLayout({children}) {
    return (
        <>
            <Header />
                {children}
            <Footer />
        </>
    )
}