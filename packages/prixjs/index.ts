export async function config(configObj: { root?: HTMLElement, folder?: string } = {}): Promise<void> {
  const prixRoot = (configObj.root || document.getElementById('app')) as HTMLElement;
  const pathName = window.location.pathname;
  const fileName = pathName === '/' ? 'index' : pathName.substring(pathName.lastIndexOf('/') + 1);

  try {
    const pageModule = await import('./error1.js');
    prixRoot.innerHTML = pageModule.default();
  } catch (error) {
    console.log(error);
    const errorPage = await import(/* @vite-ignore */ `./error.js`);
    let rootError = 'Prix error: An error occurred while loading the Prix components, see the console for more information.';
    const err = document.getElementById('app') as HTMLElement;
    if (configObj.root == undefined || configObj.folder == undefined) {
      err.innerHTML = errorPage.default(rootError);
      return;
    }
    err.innerHTML = errorPage.default(error);
  }
}

export function Store<T>(initialValue: T, backingValue?: T) {
  let val: T = initialValue ?? backingValue!;

  let updater = () => {};
  const updateState = (newVal: T) => {
    val = newVal;
    updater();
  };

  const StoreSetter = (updaterFunc: () => void) => {
    updater = updaterFunc;
    updater();
  };

  if (initialValue == null && backingValue == null || initialValue == undefined && backingValue == undefined) {
    console.error("Don't provided any value in initialValue/backupValue in Prix Store");
  }

  return [val, updateState, StoreSetter] as const;
}

export function Effect(callback: () => void, dependencies: { val: unknown }[]) {
  const memories: unknown[] = [];
  let firstExec = true;

  const updateMemories = () => {
    memories.length = 0;
    dependencies.forEach((dependency) => {
      memories.push(dependency.val);
    });
  };

  const execCallback = () => {
    updateMemories();
    callback();
  };

  if (firstExec) {
    execCallback();
    firstExec = false;
  }

  if (dependencies.some((dependency) => dependency.val !== dependency.val)) {
    execCallback();
  }
}
