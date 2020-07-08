// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable no-template-curly-in-string */

export const MARKETPLACE_API_URL = process.env.MARKETPLACE_API_URL;

export const MARKET_ITEM_LIST = [
  {
    id: '0b41d10e-36e5-4e97-95c2-27726dd94f34',
    name: 'Couplet Dataset',
    author: 'OpenPAI',
    type: 'data',
    categories: 'AI couplet',
    tags: ['official example'],
    summary: 'Dataset of couplet',
    description:
      '# Couplet Dataset\n\nThis is the dataset of couplet. \n\n## Data content\n\nThis dataset contains processed data based on [Microsoft AI EDU project](https://github.com/microsoft/ai-edu/blob/master/B-%E5%AE%9E%E8%B7%B5%E6%A1%88%E4%BE%8B/B13-AI%E5%AF%B9%E8%81%94%E7%94%9F%E6%88%90%E6%A1%88%E4%BE%8B/docs/fairseq.md).\n\nThe original dataset was downloaded from [Public couplet dataset](https://github.com/wb14123/couplet-dataset) and was splited into ```test, train and valid``` with 98:1:1 proportion. The ```.up``` and ```.down``` files contains upper part and down part of a certain couplet seperately.\n\n## The file stucture\n\n```\n.\n|-- test.down // down part of couplet\n|-- test.up  // up part of couplet\n|-- train.down\n|-- train.up\n|-- valid.down\n|-- valid.up\n```\n\n## How to use it\n\nThe data was stored in a pai nfs storage. It will be mounted in container when you use the data in pai cluster.\n\n\n',
    content: {
      dataStorage: {
        storageType: 'nfs',
        groups: ['default'],
        storageName: 'confignfs',
        serverPath: '10.151.40.235:/data/couplet_data',
        containerPath: '/mnt/confignfs/couplet_data',
      },
    },
    useNumber: 0,
    starNumber: 0,
    status: 'approved',
    createdAt: '2020-05-06T04:52:48.289Z',
    updatedAt: '2020-05-06T04:52:48.289Z',
  },
  {
    id: '8e0b3086-0359-4e75-b11c-c5527487626e',
    name: 'Couplet Training Model',
    author: 'OpenPAI',
    type: 'template',
    categories: 'AI couplet',
    tags: ['official example'],
    summary: 'Dataset of couplet',
    description:
      '# Couplet Training Model\n\nThis is a model training process. After training, this model will give a down part with an upper part of couplet. Please refer to [Microsoft AI Edu Project](https://github.com/microsoft/ai-edu/blob/master/B-%E5%AE%9E%E8%B7%B5%E6%A1%88%E4%BE%8B/B13-AI%E5%AF%B9%E8%81%94%E7%94%9F%E6%88%90%E6%A1%88%E4%BE%8B/docs/fairseq.md) for more details.\n\n## Training Data\n\nYou could use ```Couplet Dataset``` data component as training data, or any dataset follows ```fairseq``` model requirements.\n\n## How to use\n\nWhen use this module, you should set three environment variables:\n\n- ```RAW_DATA_DIR```: the training data path in container, if you use ```Couplet Dataset``` data component, this value will be auto filled.\n\n- ```PREPROCESSED_DATA_DIR```: the path to store intermediate result\n\n- ```MODEL_SAVE_DIR```: the path to store output result, i.e. the training model. You could use the predefined output storage, then you could get the results outside container.',
    content: {
      dockerImage: 'openpai/standard:python_3.6-pytorch_1.2.0-gpu',
      dataStorage: {
        storageType: 'nfs',
        groups: ['default'],
        storageName: 'confignfs',
        serverPath: '10.151.40.235:/data/couplet_data',
        containerPath: '/mnt/confignfs/couplet_data',
      },
      codeStorage: null,
      outputStorage: {
        storageType: 'nfs',
        groups: ['default'],
        storageName: 'confignfs',
        serverPath: '10.151.40.235:/data/output',
        containerPath: '/mnt/confignfs/output',
      },
      commands: [
        'export PREPROCESSED_DATA_DIR=./preprocessed_data',
        'pip install fairseq',
        'fairseq-preprocess \\',
        '--source-lang up \\',
        '--target-lang down \\',
        '--trainpref ${DATA_DIR}/train \\',
        '--validpref ${DATA_DIR}/valid \\',
        '--testpref ${DATA_DIR}/test \\',
        '--destdir ${PREPROCESSED_DATA_DIR}',
        'fairseq-train ${PREPROCESSED_DATA_DIR} \\',
        '--log-interval 100 \\',
        '--lr 0.25 \\',
        '--clip-norm 0.1 \\',
        '--dropout 0.2  \\',
        '--criterion label_smoothed_cross_entropy \\',
        '--save-dir ${OUTPUT_DIR} \\',
        '-a lstm \\',
        '--max-tokens 4000 \\',
        '--max-epoch 100',
      ],
    },
    useNumber: 0,
    starNumber: 0,
    status: 'approved',
    createdAt: '2020-05-06T04:52:48.289Z',
    updatedAt: '2020-05-06T04:52:48.289Z',
  },
  {
    id: 'a493d4cf-a79e-490f-95c9-06900cdcbd98',
    name: 'Couplet Inference Model',
    author: 'OpenPAI',
    type: 'template',
    categories: 'AI couplet',
    tags: ['official example'],
    summary: 'Dataset of couplet',
    description:
      '# Caffe MNIST Example\nThis example shows how to train LeNet on MNIST with Caffe on OpenPAI.\n\n## Dataset\nThe MNIST dataset is downloaded from MNIST website and converted into caffe format.\n\n## LeNet\nThis example will use the LeNet network, which is known to work well on digit classification tasks.\nIt will use a slightly different version from the original LeNet implementation,\nreplacing the sigmoid activations with Rectified Linear Unit (ReLU) activations for the neurons.\n\nThe design of LeNet contains the essence of CNNs that are still used in larger models such as the ones in ImageNet.\nIn general, it consists of a convolutional layer followed by a pooling layer, another convolution layer followed by a pooling layer,\nand then two fully connected layers similar to the conventional multilayer perceptrons.\nThe layers are defined in `$CAFFE_ROOT/examples/mnist/lenet_train_test.prototxt`.\n\n## Reference\nhttp://caffe.berkeleyvision.org/gathered/examples/mnist.html\n',
    content: {
      dockerImage: 'openpai/standard:python_3.6-pytorch_1.2.0-gpu',
      codeStorage: {
        storageType: 'nfs',
        groups: ['default'],
        storageName: 'confignfs',
        serverPath: '10.151.40.235:/data/',
        subPaths: 'couplet_service',
        containerPath: '/mnt/confignfs/',
      },
      outputStorage: {
        storageType: 'nfs',
        groups: ['default'],
        storageName: 'confignfs',
        serverPath: '10.151.40.235:/data/',
        subPaths: 'output',
        containerPath: '/mnt/confignfs/',
      },
      environmentVariables: {
        FLASK_RUN_PORT: { type: 'port', value: null },
      },
      commands: [
        ' pip install fairseq',
        ' pip install flask',
        ' cd /mnt/confignfs/couplet_service/',
        ' export FLASK_APP=app.py',
        ' python -m flask run',
      ],
    },
    useNumber: 0,
    starNumber: 0,
    status: 'approved',
    createdAt: '2020-05-06T04:52:48.289Z',
    updatedAt: '2020-05-06T04:52:48.289Z',
  },
];