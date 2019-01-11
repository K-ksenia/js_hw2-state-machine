import { machine, useContext, useState } from 'my-state-machine'

// machine — создает инстанс state machine (фабрика)
const vacancyMachine1 = machine({
    // У каждого может быть свой id
    id: 'vacancy',
    // начальное состояние
    initialState: 'notResponded',
    // дополнительный контекст (payload)
    context: {id: 1},
    // Граф состояний и переходов между ними
    states: {
    // Каждое поле — это возможное состоение
        responded: {
        // action, который нужно выполнить при входе в это состояние. Можно задавать массивом, строкой или функцией
            onEntry: 'onStateEntry'
        },
        notResponded: {
        // action, который нужно выполнить при выходе из этого состояния. Можно задавать массивом, строкой или функцией
            onExit() {
                console.log('we are leaving notResponded state');
            },
        // Блок описания транзакций
            on: {
            // Транзакция
                RESPOND: {
                // упрощенный сервис, вызываем при транзакции
                    service: (event) => {
                    // Позволяет получить текущий контекст и изменить его
                        const [context, setContext] = useContext();
                    // Позволяет получить текущий стейт и изменить его
                        const [state, setState] = useState();
                    // Поддерживаются асинхронные действия
                        window.fetch({method: 'post', data: {resume: event.resume, vacancyId: context.id} }).then(() => {
                    // меняем состояние
                            setState('responded');
                    // Мержим контекст
                            setContext({completed: true}); // {id: 123, comleted: true}
                          });
                      },
                // Если не задан сервис, то просто переводим в заданный target, иначе выполняем сервис.
                //     target: 'responded',
                }
            }
        },
    },
    // Раздел описание экшенов
    actions: {
        onStateEntry: (event) => {
            const [state] = useState();
            console.log('now state is ' + state);
        },
        makeResponse: (event) => {
            // both sync and async actions
            const [context, setContext] = useContext();
            window.fetch({method: 'post', data: {resume: event.resume, vacancyId: context.id} })
        }
    }
});

const vacancyMachine2 = machine({
    // У каждого может быть свой id
    id: 'vacancy',
    // начальное состояние
    initialState: 'notResponded',
    // дополнительный контекст (payload)
    context: {id: 2},
    // Граф состояний и переходов между ними
    states: {
    // Каждое поле — это возможное состоение
        responded: {
        // action, который нужно выполнить при входе в это состояние. Можно задавать массивом, строкой или функцией
            onEntry: 'onStateEntry'
        },
        notResponded: {
        // action, который нужно выполнить при выходе из этого состояния. Можно задавать массивом, строкой или функцией
            onExit() {
                console.log('we are leaving notResponded state');
            },
        // Блок описания транзакций
            on: {
            // Транзакция
                RESPOND: {
                // Если не задан сервис, то просто переводим в заданный target, иначе выполняем сервис.
                    target: 'responded',
                }
            }
        },
    },
    // Раздел описание экшенов
    actions: {
        onStateEntry: (event) => {
            const [state] = useState();
            console.log('now state is ' + state);
        },
        makeResponse: (event) => {
            // both sync and async actions
            const [context, setContext] = useContext();
            window.fetch({method: 'post', data: {resume: event.resume, vacancyId: context.id} })
        }
    }
});

const vacancyMachine3 = machine({
    // У каждого может быть свой id
    id: 'vacancy',
    // начальное состояние
    initialState: 'notResponded',
    // дополнительный контекст (payload)
    context: {id: 3},
    // Граф состояний и переходов между ними
    states: {
    // Каждое поле — это возможное состоение
        responded: {
        // action, который нужно выполнить при входе в это состояние. Можно задавать массивом, строкой или функцией
            onEntry: 'onStateEntry'
        },
        notResponded: {
        // action, который нужно выполнить при выходе из этого состояния. Можно задавать массивом, строкой или функцией
            onExit() {
                console.log('we are leaving notResponded state');
            },
        // Блок описания транзакций
            on: {
            // Транзакция
                RESPOND: {
                // Если не задан сервис, то просто переводим в заданный target, иначе выполняем сервис.
                    target: 'notResponded',
                }
            }
        },
    },
    // Раздел описание экшенов
    actions: {
    }
});

const vacancyMachine4 = machine({
    // У каждого может быть свой id
    id: 'vacancy',
    // начальное состояние
    initialState: 'notResponded',
    // дополнительный контекст (payload)
    context: {id: 4},
    // Граф состояний и переходов между ними
    states: {
    // Каждое поле — это возможное состоение
        responded: {
        // action, который нужно выполнить при входе в это состояние. Можно задавать массивом, строкой или функцией
            onEntry: 'onStateEntry'
        },
        notResponded: {
        // action, который нужно выполнить при выходе из этого состояния. Можно задавать массивом, строкой или функцией
            onExit() {
                console.log('we are leaving notResponded state');
            },
        // Блок описания транзакций
            on: {
            // Транзакция
                RESPOND: {
                // упрощенный сервис, вызываем при транзакции
                    service: (event) => {
                    // Позволяет получить текущий контекст и изменить его
                        const [context, setContext] = useContext();
                    // Позволяет получить текущий стейт и изменить его
                        const [state, setState] = useState();
                    // Поддерживаются асинхронные действия
                        window.fetch({method: 'post', data: {resume: event.resume, vacancyId: context.id} }).then(() => {
                    // меняем состояние
                            setState('responded');
                    // Мержим контекст
                            setContext({completed: true}); // {id: 123, comleted: true}
                          });
                      },
                // Если не задан сервис, то просто переводим в заданный target, иначе выполняем сервис.
                    target: 'responded',
                }
            }
        },
    },
    // Раздел описание экшенов
    actions: {
        onStateEntry: (event) => {
            const [state] = useState();
            console.log('now state is ' + state);
        },
        makeResponse: (event) => {
            // both sync and async actions
            const [context, setContext] = useContext();
            window.fetch({method: 'post', data: {resume: event.resume, vacancyId: context.id} })
        }
    }
});

// Пример использования StateMachine
try {
    console.log('vacancyMachine1, trying to execute non-existent transaction')
    vacancyMachine1.transition('NOTRESPOND', {resume: {name: 'Vasya', lastName: 'Pupkin'}});
} catch (err) {
    console.log(err);
}

try {
    console.log('vacancyMachine1, on: service, from notResponded to responded')
    vacancyMachine1.transition('RESPOND', {resume: {name: 'Vasya', lastName: 'Pupkin'}});
    console.log('vacancyMachine2, on: target, from notResponded to responded')
    vacancyMachine2.transition('RESPOND');
    console.log('vacancyMachine3, on: target, from notResponded to notResponded')
    vacancyMachine3.transition('RESPOND');
    console.log('vacancyMachine2, on: target, from responded (without block \'on\')')
    vacancyMachine2.transition('RESPOND');
    console.log('vacancyMachine4 service from notResponded to responded')
    vacancyMachine4.transition('RESPOND', {resume: {name: 'Vasya', lastName: 'Pupkin'}});
} catch (err) {
    console.log(err);
}

