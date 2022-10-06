export interface ButtonProps {
    innertext: string;
}

const Button: React.FC<ButtonProps> = (props) => {
    return <div className="buttonDiv">{props.innertext}</div>;
}

export default Button;