# Digit Recognizer with Tensorflow JS
A short personal project to train a model using Keras in Python and use TFJS library for on-browser prediction.

[See in action](https://piyush-kgp.github.io/Digit-Recognition-with-TFJS/)


### Requires
This code has been tested on `Tensorflow 1.11` and higher using `python3`.

```bash
#Start a virtual environment
virtualenv venv
source venv/bin/activate

#Install libraries
pip3 install tensorflow==1.11
pip3 install tensorflowjs
```

### Train model and convert to the format required by Tensorflow JS
```bash
python3 model_builder.py
````


Here we use the following line in the Python code as mentioned in the [docs](https://js.tensorflow.org/tutorials/import-keras.html) to convert to desired format:
```
tfjs.converters.save_keras_model(model, 'tfjs_target_dir')
```
Alternatively, we could use the bash command:
```bash
tensorflowjs_converter --input_format keras \
                       my_mnist_model.h5 \
                       tfjs_target_dir
```

Notice that our model is very simple ie just a hidden layer with `relu` activations, a dropout layer and finally an output layer with softmax activations.
```
Layer (type)                 Output Shape              Param #   
=================================================================
dense (Dense)                (None, 512)               401920    
_________________________________________________________________
dropout (Dropout)            (None, 512)               0         
_________________________________________________________________
dense_1 (Dense)              (None, 10)                5130      
=================================================================
Total params: 407,050
Trainable params: 407,050
Non-trainable params: 0
_________________________________________________________________
```

#### Credits
Some part of the javascript code is borrowed from the [TFJS mnist-core example ](https://github.com/tensorflow/tfjs-examples/tree/master/mnist-core) and also in order to avoid a lot of work on frontend, I used the [template](https://github.com/tensorflow/tfjs-examples/tree/master/shared) from the TFJS examples repo.
<b>Bonus tip</b>: It helps to clone the TFJS examples repo and run everything just to see what TFJS is capable of (a lot). You can use this custom-made bash command for this.

```bash
brew install yarn # replace with suitable command for non-macOS
git clone https://github.com/tensorflow/tfjs-examples
cd tfjs-examples
ls -d */ | xargs -I {} bash -c "cd '{}' && pwd && yarn && nohup yarn watch > /dev/null 2>&1 &" #goes into each directory and runs scripts without hanging up.
```
#### Side Note
The focus for this project is not to attain very high accuracy on actual hand-written images in demo but to make TFJS work with the Keras-trained model. Even so, there were several challenges due to the TFJS library being still in its infancy (and me being a beginner in TFJS).
One sure-shot way to improve accuracy would be to modify the way the canvas output is being converted into 2D tensor. The current workaround produces non-continuous segments. (Look at `check.png`); whereas actual MNIST images contain continuous segments. This however will require significant tweaking with the canvas event listener functions. However since the results are reasonably well, this is not necessary.

One important learning from this project is to use TFJS version `0.13.5` instead of `0.11.5` because the earlier version throws very weird (and misleading) errors.


<!-- Most notably, the TFJS version `0.11.5` throws `Uncaught (in promise) Error: Sequential.fromConfig called without an array of configs` error for the javascript line `tf.loadModel(MODEL_PATH)`; which seems like some issue with the files at `MODEL_PATH` but is actually just a TFJS bug; which simply vanishes if you just upgrade to TFJS being imported to `0.13.5`. -->
