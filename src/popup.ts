import { api, getSettings, type Settings } from "./shared";

const inputs = document.querySelectorAll<HTMLInputElement>("input[data-key]");
const master = document.querySelector<HTMLInputElement>('input[data-key="enabled"]')!;
const grant = document.getElementById("grant") as HTMLButtonElement;
const origins = api.runtime.getManifest().host_permissions ?? [];

const syncDisabled = () =>
	inputs.forEach(i => (i.disabled = i !== master && !master.checked));

getSettings().then(s => {
	inputs.forEach(i => (i.checked = s[i.dataset.key as keyof Settings]));
	syncDisabled();
});

inputs.forEach(i =>
	i.addEventListener("change", () => {
		api.storage.sync.set({ [i.dataset.key!]: i.checked });
		syncDisabled();
	}),
);

document.getElementById("version")!.textContent = api.runtime.getManifest().version;

// Some platforms (e.g. Firefox Android MV3) may not grant host access at install.
api.permissions.contains({ origins }).then(ok => (grant.hidden = ok));
grant.addEventListener("click", () =>
	api.permissions.request({ origins }).then(ok => (grant.hidden = ok)),
);
