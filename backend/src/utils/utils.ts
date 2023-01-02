export async function awaitWithTimeout<T = any>(
  func: Promise<T>,
  timeout: number,
  timeoutError = new Error('Promise timed out')
): Promise<T> {
  return new Promise((resolve, reject): void => {
    const to = setTimeout(() => {
      console.log(`timeout`);
      reject(timeoutError);
    }, timeout);

    func
      .then((res: T) => {
        clearTimeout(to);
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
