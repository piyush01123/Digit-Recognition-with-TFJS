import os
import tensorflow as tf
import tensorflowjs as tfjs
from tensorflow.keras.layers import *
from tensorflow.keras.models import Sequential
from tensorflow.keras.datasets import mnist
import numpy as np
try:
    assert tf.__version__ >= '1.11.0'
except:
    exit('You must have Tensorflow >= 1.11')

(X_train, Y_train), (X_test, Y_test) =  mnist.load_data()
X_train, X_test = X_train.astype(np.float32), X_test.astype(np.float32)
X_train[np.where(X_train<=128)] = 0.0
X_train[np.where(X_train>128)] = 1.0
X_test[np.where(X_test<=128)] = 0.0
X_test[np.where(X_test>128)] = 1.0
X_train = X_train.reshape(-1, 784)
X_test = X_test.reshape(-1, 784)

def create_model():
    model = Sequential([
                Dense(512, activation=tf.nn.relu, input_shape=(784,)),
                Dropout(0.2),
                Dense(10, activation=tf.nn.softmax)
            ])
    print(model.summary())
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    return model

model = create_model()
model.fit(x = X_train, y = Y_train, batch_size = 100, validation_data = (X_test, Y_test))
model.save('my_mnist_model.h5')
tfjs.converters.save_keras_model(model, 'tfjs_target_dir')
