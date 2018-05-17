import { wrapAction } from 'nexusdk';
import vm from 'vm';

function getPlainError(err) {
  let result = {};
  const keys = Object.getOwnPropertyNames(err);
  for (let keydex = 0; keydex < keys.length; keydex += 1) {
    const key = keys[keydex];
    result[key] = err[key];
  }
  return result;
}

wrapAction((properties, sendMessage) => {
  const { code } = properties;
  try {
    const script = new vm.Script(code, { displayErrors: true });
    return script.runInThisContext();
  } catch(err) {
    console.log('inner catch')
    sendMessage('error', getPlainError(err));
  }
});
