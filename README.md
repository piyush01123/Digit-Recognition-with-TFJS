# digit-recognizer-with-tfjs
A short personal project of mine using tfjs.

[Play around]()
Demonstrates saving model in Python and loading it in tfjs for a Neural Network
trained on MNIST.


## Requires
`Tensorflow 1.11`
You must `pip3 instal tensorflow==1.11`. For some reason, they are continuously
releasing backwards incompatible Tensorflow versions


```bash
pip3 install tensorflow==1.11
pip3 install tensorflowjs
```
## Step 1: Train model and save to HDF5 format
```bash
python3 model_builder.py
````

## Step 2 (Optional) : Test that the saved model files are working fine in Python
```bash
python3 test_saved_model.py
```


## Step 3: Convert HDF5 model file to JSON

TFJS requires you to do this to load model in browser
```bash
tensorflowjs_converter --input_format keras \
                       my_mnist_model.h5 \
                       tfjs_mnist
```

Alternatively, we can use the following line in the Python code as mentioned in the
[tfjs docs](https://js.tensorflow.org/tutorials/import-keras.html)
```
tfjs.converters.save_keras_model(model, tfjs_target_dir)
```
