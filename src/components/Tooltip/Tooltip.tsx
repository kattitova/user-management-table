import './Tooltip.css';

type propsTypes = {
    text: string;
}

export default function Tooltip({ text }: propsTypes) {
    return (
        <span className="tooltip">{text}</span>
    );
}