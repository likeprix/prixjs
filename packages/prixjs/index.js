"use strict";

export function render(routes, element) {
  const currentPath = window.location.pathname;
  const component = routes[currentPath] || routes['404'];
  if(component === routes['404']) console.log('Page not found');

  const html = component()
  const app = element;
  app.innerHTML = html;
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