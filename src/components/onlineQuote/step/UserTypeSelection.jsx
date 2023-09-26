export default function UserTypeSelection({ userType, onChange}) {
  return (
    <>
        <label>
        Choix du type d'utilisateur :
        </label>
        <div className="f-wrap flex f-jc">
            <label className="radio">
            
            <input
                type="radio"
                name="choiceUser"
                value="individual"
                checked={userType === 'individual'}
                onChange={onChange}
            /> 
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Particulier

            </label>
                
            <label className="radio">
            <input
                type="radio"
                name="choiceUser"
                value="entreprise"
                checked={userType === 'entreprise'}
                onChange={onChange}
            /> 
            <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path d="M7 2v5H2v39h12v-2H4V9h5V4h20v3H11v2h23v11h2V7h-5V2zm1 10v2h4v-2zm9 0v2h4v-2zm9 0v2h4v-2zM8 17v2h4v-2zm9 0v2h4v-2zm9 0v2h4v-2zm3 3c-3.258 0-5.672 1.324-6.926 3.297-1.144 1.797-1.199 4.043-.48 6.137-.078.132-.192.246-.266.406-.156.351-.293.75-.273 1.258v.004c.054 1.277.797 1.945 1.343 2.32.23 1.219.809 2.238 1.602 2.969v2.14c-.176.422-.527.778-1.203 1.149-.707.39-1.664.758-2.652 1.238-.989.48-2.02 1.094-2.82 2.07C16.52 43.968 16 45.308 16 47v1h32.05l-.058-1.059c-.09-1.578-.676-2.824-1.504-3.718-.824-.895-1.843-1.457-2.808-1.903-.965-.445-1.895-.785-2.57-1.148-.645-.34-.962-.66-1.11-1.012v-1.687c.598-.864.86-1.856.938-2.785.476-.422 1.03-1.07 1.187-2.231a2.94 2.94 0 0 0-.43-1.992c.45-1.188.633-2.621.239-4.047-.227-.828-.657-1.64-1.371-2.246-.56-.48-1.325-.746-2.172-.863L37.75 22h-.625c-1.027 0-2.04.238-2.91.578a7.92 7.92 0 0 0-.95.45 4.295 4.295 0 0 0-.55-.614c-.61-.55-1.453-.863-2.39-.992L29.62 20zM8 22v2h4v-2zm9 0v2h2.484l1.278-2zm11.438.113.59 1.188h.617c.82 0 1.324.234 1.726.594.402.363.695.902.867 1.535.344 1.265.051 2.91-.23 3.363l-.363.578.406.55c.238.317.39.645.312 1.087-.11.617-.332.699-.773 1.082l-.332.285-.012.438c-.035.98-.375 1.964-.945 2.527l-.301.293v3.355l.059.164c.394 1.098 1.277 1.782 2.175 2.278.899.496 1.868.86 2.743 1.285.875.426 1.632.91 2.156 1.547.363.437.586 1.027.722 1.738h-19.71c.136-.71.359-1.3.722-1.738.524-.637 1.281-1.121 2.156-1.547.875-.426 1.844-.79 2.743-1.285.898-.496 1.78-1.18 2.175-2.278l.059-.164v-3.465l-.438-.296c-.46-.313-1.218-1.457-1.324-2.485l-.054-.554-.5-.243c-.286-.136-.602-.191-.633-.93 0 0 .031-.19.105-.359.078-.172.219-.351.176-.308l.48-.48-.269-.626c-.746-1.719-.645-3.52.219-4.875.789-1.242 2.336-2.097 4.675-2.254zm8.12 2 .532 1.086h.625c.758 0 1.207.2 1.55.492.348.293.594.723.739 1.258.297 1.07.082 2.531-.258 3.196l-.328.652.516.512c-.067-.067.261.476.207.886-.13.98-.27.918-.692 1.196l-.418.277-.031.504c-.047.871-.484 2.18-.719 2.418l-.281.289v2.742l.059.16c.379 1.055 1.238 1.696 2.109 2.157.867.46 1.812.8 2.676 1.199.863.398 1.633.847 2.176 1.441.347.375.582.856.75 1.422h-5.848c-.164-1.223-.61-2.234-1.246-3.012-.801-.976-1.832-1.59-2.82-2.07-.989-.48-1.946-.848-2.653-1.238-.676-.371-1.027-.727-1.203-1.149v-2.234c.691-.875 1.055-1.906 1.156-2.953.387-.34.989-.926 1.176-1.985.152-.867-.105-1.574-.426-2.148.532-1.223.688-2.75.262-4.309-.004-.015-.012-.03-.016-.047a4.7 4.7 0 0 1 .797-.414c.489-.191 1.059-.261 1.61-.328zM8 27v2h4v-2zm9 0v2h2.754l-.36-2zm-9 5v2h4v-2zm9 0v2h3.45l-.837-2zm-9 5v2h4v-2zm9 0v2h4v-2z"/></svg>
            Entreprise
            </label>
        </div>
    </>
    );
}