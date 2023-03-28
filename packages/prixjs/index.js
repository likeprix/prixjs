export async function config(configObj = {}) {
    const prixRoot = (configObj.root || document.getElementById('app'))
    const pathName = window.location.pathname;
    const fileName = pathName === '/' ? 'index' : pathName.substring(pathName.lastIndexOf('/') + 1);
    
    try {
        const pageModule = await import(file /* in test*/);
        prixRoot.innerHTML = pageModule.default();
    } catch (error) {
        console.log(error);
        const errorPage = await import(/* @vite-ignore */ `./error.js`);
        let rootError = 'Prix error: An error occurred while loading the Prix components, see the console for more information.';
        const err = document.getElementById('app')
        if(configObj.root == undefined || configObj.folder == undefined) {
            return err.innerHTML = errorPage.default(rootError);
        }
        err.innerHTML = errorPage.default(error);
    }
}

export function Store(initialValue, backingValue) {
    let val = initialValue || backingValue;

    let updater = () => {};
    const updateState = (newVal) => {
      val = newVal;
      updater();
    }

    const StoreSetter = (updaterFunc) => {
      updater = updaterFunc;
      updater();
    };

    if(initialValue == null && backingValue == null || initialValue == undefined && backingValue == undefined) {
      console.error("Don't provided any value in initialValue/backupValue in Prix Store")
    }

    return [val, updateState, StoreSetter];

  }

  export function Effect(callback, dependencies) {
    const memories = [];
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
