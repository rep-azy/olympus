import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const showAlertMessage = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            console.log("Form submitted:", formData);
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setIsLoading(false);
            //alert("Thank you. I will get back to you as soon as possible.");
            showAlertMessage("success", "Your message has been sent successfully!");
            setFormData({name: "", email: "", message: ""});
        } catch (error) {
            setIsLoading(false);
            console.error("Error sending:", error);
            //alert("Something went wrong. Please try again.");
            showAlertMessage("danger", "Something went wrong. Please try again.")
        }
    };
    
    return (
        <section className="relative flex items-center c-space section-spacing">
            <Particles
                className="absolute inset-0 -z-50 pointer-events-none"
                quantity={100}
                ease={80}
                color={'#fff'}
                refresh
            />
            {showAlert && <Alert type={alertType} text={alertMessage} />}
            <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-black relative z-10">
                <div className="flex flex-col items-start w-full gap-5 mb-10">
                    <h2 className="text-heading">
                        Let's Talk
                    </h2>
                    <p className="font-normal text-neutral-400">
                        Whether you're looking to build a new website, improve your existing platform, or bring a unique project to life, I'm here to help.
                    </p>
                </div>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Full Name</label>
                        <input id="name" name="name" type="text" className="field-input field-input-focus" placeholder="John Doe" required autoComplete="name" value={formData.name} onChange={handleChange}/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
                        <input id="email" name="email" type="email" className="field-input field-input-focus" placeholder="johndoe@email.com" required autoComplete="email" value={formData.email} onChange={handleChange}/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">Message</label>
                        <textarea id="message" name="message" type="text" rows="4" className="field-input field-input-focus" placeholder="Share your thoughts..." required autoComplete="message" value={formData.message} onChange={handleChange}/>
                    </div>
                    <button type="submit" className="w-full px=1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-sand to-sun hover-animation">
                        {isLoading ? "Sending..." : "Send"}
                    </button>
                </form>
            </div>
        </section>
    )
};

export default Contact;