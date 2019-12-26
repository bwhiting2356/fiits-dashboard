const fs = require('fs-extra');

// tslint:disable-next-line: no-floating-promises
(async() => {
    const src = '../dist';
    const copy = './dist';

    await fs.remove(copy);
    await fs.copy(src, copy);

})();
