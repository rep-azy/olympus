import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const CopyEmailButton = () => {
    const [copied, setCopied] = useState(false);
    const email = "azelsumanting@gmail.com";

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    return (
        <motion.button 
            onClick={copyEmail} 
            className="relative px-1 py-4 text-sm text-center rounded-full font-extralight bg-primary w-[12rem] cursor-pointer overflow-hidden"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 1.05 }}
            disabled={copied}
        >
            <AnimatePresence mode="wait">
                {copied ?
                    <motion.p 
                        className="flex items-center justify-center gap-2"
                        key="copied"
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <img src="assets/copy-done.svg" className="w-5" alt="copy icon" />
                        Email copied!
                    </motion.p>
                    : 
                    <motion.p
                        className="flex items-center justify-center gap-2"
                        key="copy"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <img src="assets/copy.svg" className="w-5" alt="copy icon" />
                        Copy Email Address
                    </motion.p>
                }
            </AnimatePresence>
        </motion.button>
    )
};

export default CopyEmailButton;