const machineStack = [];

function safeRunFunction(func, machine, event) {
     machineStack.push([machine, event]);
     func(event);
     machineStack.pop();
}

function runAction(machine, action, event) {
    if (!machine.actions[action]) {
        throw new Error("Trying to run non-existent action " + action);
    }
    safeRunFunction(machine.actions[action], machine, event)
}

function implementAction(machine, action, event) {
     // Проверяем чем является action (массивом, строкой или функцией)
    if (typeof action === "function") {
        action();
    } else if (Array.isArray(action)) {
        for (let act in action) {
            runAction(machine, act, event);
        }
    } else {
        runAction(machine, action, event);
    }
}

function useContext() {
    const [machine, event] = machineStack[machineStack.length-1];
    return [machine.context, newContext => {Object.assign(machine.context, newContext)} ];
}

function useState() {
    const [machine, event] = machineStack[machineStack.length-1];
    return [machine.state,
            newState => {
                if (!machine.states[newState]) {
                    throw new Error("Trying to set non-existent state " + newState);
                }
                if (machine.state !== newState) {
                    implementAction(machine, machine.states[machine.state].onExit, event);
                    machine.state = newState;
                    implementAction(machine, machine.states[machine.state].onEntry, event);
                } else console.log("Machine is already in state " + newState);
            }];
}

function machine(stateMachine) {
    const newMachine = {
        id: stateMachine.id,
        state: stateMachine.initialState,
        context: stateMachine.context,
        states: stateMachine.states,
        actions: stateMachine.actions,
        transition(transaction, event) {
            // Проверяем есть ли у текущего состояния блок описания транзакций
            if (!this.states[this.state].on) {
                throw new Error("State " + this.state + " must have transactions description block 'on'");
            }
            let operation = this.states[this.state].on[transaction];
            // Проверяем есть ли в блоке описания транзакций запрашиваемая транзакция
            if (!operation) {
                throw new Error("State " + this.state + " has no transaction " + transaction);
            }
            // Определяем наличие сервиса и приступаем к выполнению транзакции
            if (operation.service) {
                safeRunFunction(operation.service, this, event)
            } else if (operation.target) {
                safeRunFunction( () => {const [state, setState] = useState();
                                        setState(operation.target)},
                                this, event);
            } else {
                throw new Error("Transaction " + transaction + " must have service or target property");
            }
        }
    };
    return newMachine;
}

export {machine, useContext, useState}