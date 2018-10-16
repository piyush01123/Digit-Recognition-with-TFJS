import os
import tensorflow as tf
import tensorflowjs as tfjs

try:
    assert tf.__version__ == '1.11.0'
except:
    exit('You must have Tensorflow 1.11')

mnist = tf.keras.datasets.mnist
Flatten, Dense, Dropout = tf.keras.layers.Flatten, tf.keras.layers.Dense, tf.keras.layers.Dropout
Sequential = tf.keras.models.Sequential

(X_train, Y_train), (X_test, Y_test) =  mnist.load_data()
X_train, X_test = X_train/255.0, X_test/255.0

def create_model():
    model = Sequential([
                Flatten(input_shape=(28,28)),
                Dense(512, activation=tf.nn.relu),
                Dropout(0.2),
                Dense(10, activation=tf.nn.softmax)
            ])
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    return model

model = create_model()
checkpoint_path = "checkpoints/cp.ckpt"
checkpoint_dir = os.path.dirname(checkpoint_path)
cp_callback = tf.keras.callbacks.ModelCheckpoint(checkpoint_path,
                                                 save_weights_only=True,
                                                 verbose=1)
model.fit(x = X_train, y = Y_train, batch_size = 100, validation_data = (X_test, Y_test), callbacks = [cp_callback])
model.save('my_mnist_model.h5')
tfjs.converters.save_keras_model(model, 'tfjs_target_dir')


# def freeze_session(session, keep_var_names=None, output_names=None, clear_devices=True):
#     """
#     Freezes the state of a session into a pruned computation graph.
#
#     Creates a new computation graph where variable nodes are replaced by
#     constants taking their current value in the session. The new graph will be
#     pruned so subgraphs that are not necessary to compute the requested
#     outputs are removed.
#     @param session The TensorFlow session to be frozen.
#     @param keep_var_names A list of variable names that should not be frozen,
#                           or None to freeze all the variables in the graph.
#     @param output_names Names of the relevant graph outputs.
#     @param clear_devices Remove the device directives from the graph for better portability.
#     @return The frozen graph definition.
#     """
#     from tensorflow.python.framework.graph_util import convert_variables_to_constants
#     graph = session.graph
#     with graph.as_default():
#         freeze_var_names = list(set(v.op.name for v in tf.global_variables()).difference(keep_var_names or []))
#         output_names = output_names or []
#         output_names += [v.op.name for v in tf.global_variables()]
#         input_graph_def = graph.as_graph_def()
#         if clear_devices:
#             for node in input_graph_def.node:
#                 node.device = ""
#         frozen_graph = convert_variables_to_constants(session, input_graph_def,
#                                                       output_names, freeze_var_names)
#         return frozen_graph
#
#
# from tf.keras import backend as K
# # Create, compile and train model...
# frozen_graph = freeze_session(K.get_session(),
#                               output_names=[out.op.name for out in model.outputs])
# tf.train.write_graph(frozen_graph, "frozen_dir", "my_mnist_model.pb", as_text=False)
