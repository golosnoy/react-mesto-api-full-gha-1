function Footer(props) {
    const {loggedIn} = props;

    if (!loggedIn) {
        return null;
    }
    else {
    return(
    <footer className="footer">
        <p className="footer__copyright">&copy; 2023</p>
    </footer>
    );
}
}

export default Footer;