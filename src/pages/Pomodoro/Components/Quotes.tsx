import { Quote } from "../../../api/Response";

function Quotes({ quote, isOpen = true }: { quote: Quote; isOpen?: boolean }) {
    if (!isOpen) return null;
    return (
        <div
            className="absolute w-full text-center md:right-[80px] bottom-1/2 md:w-[400px] md:text-right mt-20"
            style={{
                textShadow: "rgba(12, 4, 3, 0.5) -6px 6px 6px",
            }}
        >
            <h3 className="font-italic font-bold text-2xl text-white">
                “{quote.quote}”
            </h3>
            <p className="text-white text-base">{quote.author}</p>
        </div>
    );
}

export default Quotes;
