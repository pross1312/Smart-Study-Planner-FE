import { Spinner } from "react-bootstrap";

function Loading() {
    return (
        <div className="Modal__inner">
            <div className="Modal__window">
                <div className="Modal__content">
                    <Spinner
                        animation="border"
                        role="status"
                        className="w-32 h-32"
                    />
                </div>
            </div>
        </div>
    );
}

export default Loading;
