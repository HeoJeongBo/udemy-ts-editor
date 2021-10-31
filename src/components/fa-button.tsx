interface FaButtonProps {
    iconClassName: string;
    onClick: () => void;
}

const FaButton: React.FC<FaButtonProps> = ({ iconClassName, onClick }) => {
    return (
        <button className="button is-primary is-small" onClick={onClick}>
            <span className="icon">
                <i className={`fas fa-${iconClassName}`}></i>
            </span>
        </button>
    );
};

export default FaButton;
