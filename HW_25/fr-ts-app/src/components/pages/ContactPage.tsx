import { useCallback, useState } from "react";
import APIService from "../../services/APIService";

const ContactPage: React.FC = () => {
    const [question, setQuestion] = useState<string>('');
    const [Message, setMessage] = useState<string>('');

    const onLogin = useCallback(() => {
        APIService
            .SubmitQuestion({ question })
            .then(resp => {
                if (resp.status === 'Success') {
                    setQuestion('');
                    setMessage("Message successfully sent!");
                    setTimeout(() => setMessage(""), 3000);
                    return;
                }
                else {
                    setMessage(resp.status);
                    setTimeout(() => setMessage(""), 3000);
                }
            });

    }, [question]);

    return <div>
        <h3>Contact Us</h3>
        <div>
            Enter Question <br /> <br />
            <textarea rows={9} value={question} onChange={(event) => setQuestion(event.target.value)} />
            <br />
            <br />
            <div className="buttonDiv" onClick={onLogin}>Submit</div>
            <br />
            <br />
            <span>
                {Message}
            </span>
        </div>
    </div>
}

export default ContactPage;