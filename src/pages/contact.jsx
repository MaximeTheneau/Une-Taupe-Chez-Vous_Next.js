// == Import
// import { toggleModal } from '../../../../action/modalBox';

// == Composant
function Contact() {
  // const dispatch = useDispatch();
  // const nameValue = useSelector((state) => state.contact.name);
  // const emailValue = useSelector((state) => state.contact.email);
  // const messageValue = useSelector((state) => state.contact.message);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(evt.target);
  };
  return (
    <div className="contact">
      <h1>Contact</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="Name">
          <div className="contact-form_title">Nom / Prénom*</div>
          {/* <input
            type="text"
            className="contact-form-input"
            name="user_name"
            value={nameValue}
            onChange={(evt) => dispatch(contactForm(evt.target.value, 'name'))}
            required
          /> */}
        </label>
        <label htmlFor="email">
          <div className="contact-form_title">Email*</div>
          {/* <input
            name="user_email"
            type="email"
            value={emailValue}
            className="contact-form-input"
            onChange={(evt) => dispatch(contactForm(evt.target.value, 'email'))}
            required
          /> */}
        </label>
        <label htmlFor="message">
          <div className="contact-form_title">Message*</div>
          {/* <textarea
            name="message"
            className="contact-form-input"
            value={messageValue}
            onChange={(evt) => dispatch(contactForm(evt.target.value, 'message'))}
            required
          /> */}
        </label>
        <div className="contact-form_button">
          <button type="submit">
            <i className="icon-submit" value="send" />
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}

// == Export
export default Contact;
