const Modal = ({ open, setOpen }) => {
    return (
        <>
            <div
                id="modal-fixed"
                className={`modal__fixed ${open ? 'open' : 'close'}`}
                onClick={() => setOpen(!open)}
            ></div>
            <section className="modal">
                <button className="modal__button" id="open-modal" onClick={() => setOpen(!open)}>
                    Open Modal
                </button>
                <div
                    className={`modal__container ${open ? 'show-modal' : 'hide-modal'}`}
                    id="modal-container"
                >
                    <div className="modal__content">
                        <div
                            className="modal__close close-modal"
                            title="Close"
                            onClick={() => setOpen(!open)}
                        >
                            ✖
                        </div>
                        {/* <Image
                                className="modal__img"
                                src="/vercel.svg"
                                alt="asf"
                                width="1200"
                                height="1200"
                            /> */}
                        <h1 className="modal__title">Good Job!</h1>
                        <p className="modal_description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Modal;
