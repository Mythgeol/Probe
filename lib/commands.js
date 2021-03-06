const path = require('path');

function newCommand(CmdInfo, TurnInfo) {
    const command = {
        DryRun: false,
        tps: false,
    };
    if (CmdInfo.DryRun) {
        command.DryRun = true;
    }
    command.config = {
        cwd:path.resolve(CmdInfo.Path)
    };
    return command;
}

exports.PrepareTape = function PrepareTape(CmdInfo, TurnInfo) {
    const command = newCommand(CmdInfo, TurnInfo);
    command.tps = true;
    command.command = 'docker';
    command.args = ['run',
        '--name',
        'tape',
        '-e',
        'TAPE_LOGLEVEL=debug',
        '--network',
        'host',
        '-v',
        path.resolve('./') + ':/config',
        'guoger/tape',
        'tape',
        '/config/config.yaml',
        CmdInfo.tapeCount];
    command.info = 'tape start';
    return command;
};

exports.prepareEnv = function prepareEnv(CmdInfo, TurnInfo) {
    const  command = newCommand(CmdInfo, TurnInfo);
    command.command = CmdInfo.PrepareCLI;
    command.args = [
        TurnInfo.BatchTimeout,
        TurnInfo.MaxMessageCount,
        TurnInfo.AbsoluteMaxBytes,
        TurnInfo.PreferredMaxBytes,
    ];
    command.info = 'prepare genesis block config ' + JSON.stringify(TurnInfo);
    return command;
};

exports.prepareStartup = function prepareStartup(CmdInfo, TurnInfo) {
    const command = newCommand(CmdInfo, TurnInfo);
    command.command = CmdInfo.StartCLI;
    command.args = [
        'up', 'createChannel', '-i', '2.2'
    ];
    command.info = 'network up';
    return command;
};

exports.prepareCCDeploy = function prepareCCDeploy(CmdInfo, TurnInfo) {
    const command = newCommand(CmdInfo, TurnInfo);
    command.command = CmdInfo.CCDeployCLI;
    command.args = [
        'deployCC', '-d', TurnInfo.BatchTimeout
    ];
    command.config = {
        cwd:path.resolve(CmdInfo.Path)
    };
    command.info = 'deployCC';
    return command;
};

exports.prepareSleep = function prepareSleep(CmdInfo, TurnInfo) {
    const command = newCommand(CmdInfo, TurnInfo);
    command.command = 'sleep';
    command.args = [
        CmdInfo.CoolDown
    ];
    command.config = {
        cwd:path.resolve(CmdInfo.Path)
    };
    command.info = 'cool down';
    return command;
};

exports.PrepareTapeTearDown = function PrepareTapeTearDown(CmdInfo, TurnInfo) {
    const command = newCommand(CmdInfo, TurnInfo);
    command.command = 'docker';
    command.args = [
        'rm', 'tape'
    ];
    command.config = {
        cwd:path.resolve(CmdInfo.Path)
    };
    command.info = 'tape down';
    return command;
};

exports.PrepareTearDown = function PrepareTearDown(CmdInfo, TurnInfo) {
    const command = newCommand(CmdInfo, TurnInfo);
    command.command = CmdInfo.ShutDownCLI;
    command.args = [
        'down'
    ];
    command.config = {
        cwd:path.resolve(CmdInfo.Path)
    };
    command.info = 'network down';
    return command;
};