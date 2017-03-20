import request from 'reqwest';

import IPChecker from './worker/ip_checker';
import Parser from './worker/parser';
import File from './worker/file';

const parser = new Parser(self, new IPChecker(request), new File(new FileReader()));
parser.listen();
