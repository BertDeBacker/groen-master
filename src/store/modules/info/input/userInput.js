import Algemeen from './algemeen';
import ProjectInfo from './projectInfo';
import Woning from './woning';
import Verwarming from './verwarming';
import Zonnepanelen from './zonnepanelen';
import Afschrijving from './afschrijving';

class UserInput {
  constructor() {
    this.algemeen = new Algemeen();
    this.projectInfo = new ProjectInfo();
    this.woning = new Woning();

    this.verwarming = new Verwarming();
    this.zonnepanelen = new Zonnepanelen();
    this.afschrijving = new Afschrijving();
  }
}

export {
  UserInput,
  Algemeen,
  ProjectInfo,
  Woning,
  Verwarming,
  Zonnepanelen,
  Afschrijving
};
