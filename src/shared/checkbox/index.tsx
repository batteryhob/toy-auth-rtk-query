import styles from "./index.module.scss";

interface CheckboxProps {
  label: string;
  id: string;
  propValue: boolean;
  onChange: (value: boolean) => void;
  isAll?: boolean
}

function Checkbox({ label, id, propValue, onChange, isAll }: CheckboxProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.checked;
    onChange(value);
  }

  return (
    <div className={`${styles.customCheckbox} ${isAll ? styles.all : ""}`}>
      <input type="checkbox" id={ id } checked={propValue} onChange={handleChange}/>
      <label htmlFor={ id }>
      </label>
      {label && <div className={styles.customCheckboxLabel}>{label}</div>}
    </div>
  );
}

export default Checkbox;
