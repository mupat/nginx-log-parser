import request from 'reqwest';

import IPChecker from './worker/ip_checker';
import Parser from './worker/parser';

const parser = new Parser(self, new IPChecker(request));
parser.listen();
