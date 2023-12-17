import { createEffect, on } from "solid-js";
import { useUI } from "../contexts/ui";
import "./AlertModal.css";

export default () => {
  const { UI, setUI } = useUI();

  createEffect(
    on(
      () => UI.alert.show,
      () => {
        if (UI.alert.show) {
          UI.alert.dialogRef?.showModal();
        } else {
          UI.alert.dialogRef?.close();
        }
      },
      { defer: true }
    )
  );

  createEffect(() =>
    UI.alert.dialogRef!.addEventListener("close", () =>
      setUI("alert", { show: false })
    )
  );

  return (
    <dialog ref={(dialogRef) => setUI("alert", { dialogRef })}>
      <input id="alertModal" class="alert-state" type="checkbox" />
      <div class={"alert  " + UI.alert.level}>
        {UI.alert.innerHTML}
        <label
          class="btn-close"
          for="alertModal"
          onclick={() => UI.alert.dialogRef?.close()}
          innerText="X"
        />
      </div>
    </dialog>
  );
};
