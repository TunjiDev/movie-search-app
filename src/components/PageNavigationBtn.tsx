const PageNavigationButton: React.FC<{ onClick: () => void; disabled: boolean; text: string }> = ({
  onClick,
  disabled,
  text,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      cursor: "pointer",
      backgroundColor: "brown",
      color: "white",
      padding: "0.5rem 1rem",
      borderRadius: "5px",
      opacity: disabled ? 0.5 : 1,
    }}
  >
    {text}
  </button>
);

export default PageNavigationButton;
